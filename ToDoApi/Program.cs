// API Key: rnd_G2gjJ4gvf1xzNKgLHHLcTdGI8ORd
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ToDoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ToDoDB"))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ToDo API",
        Version = "v1",
        Description = "API לניהול משימות עם CORS ו-Swagger"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ToDo API v1");
    c.RoutePrefix = string.Empty;
});

app.UseCors("AllowAll");

app.MapGet("/ToDoList/", async (ToDoDbContext context) =>
{
    return await context.Items.ToListAsync();
});

app.MapGet("/ToDoList/{Id}", async (ToDoDbContext context, int Id) =>
{
    var item = await context.Items.FindAsync(Id);
    return item != null ? Results.Ok(item) : Results.NotFound();
});

app.MapPost("/ToDoList/{name}", async (ToDoDbContext context,string name) =>
{
    Item item = new Item();
    item.Name = name;
    context.Items.Add(item);
    await context.SaveChangesAsync();
    return Results.Created($"/ToDoList/{item.Id}", item);
});

app.MapPut("/ToDoList/{Id}", async (ToDoDbContext context, int Id, Item updatedItem) =>
{
    var item = await context.Items.FindAsync(Id);
    if (item == null)
    {
        return Results.NotFound();
    }

    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;

    await context.SaveChangesAsync();
    return Results.Ok(item);
});

app.MapDelete("/ToDoList/{Id}", async (ToDoDbContext context, int Id) =>
{
    var item = await context.Items.FindAsync(Id);
    if (item == null)
    {
        return Results.NotFound();
    }

    context.Items.Remove(item);
    await context.SaveChangesAsync();
    return Results.Ok(item);
});

app.Run();
