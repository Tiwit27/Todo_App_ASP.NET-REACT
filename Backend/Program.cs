using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestoweAPI.Data;
using TestoweAPI.Services;
using TestoweAPI.Models;

namespace TestoweAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //DbContext
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            //Service
            builder.Services.AddScoped<TodoService>();

            //swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                    policy.AllowAnyOrigin()    // pozwala na po³¹czenie z ka¿dego frontendu
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseCors();

            //Endpoints

            app.MapGet("/todo", async (TodoService service) =>
                await service.GetTasks());

            app.MapPost("/todo", async (TodoService service, [FromBody] TodoItem todo) =>
                await service.AddTask(todo.Title));

            app.MapPatch("/todo/{index}", async(TodoService service, int index, [FromBody] TodoItem todo) =>
            {
                var updated = await service.UpdateTask(index, todo.Title);
                if(updated == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(updated);
            });

            app.MapDelete("/todo/{index}", async (TodoService service, int index) =>
            {
                var removed = await service.DeleteTask(index);
                if (removed == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(removed);
            });

            app.MapPatch("/todo/{index}/status", async (TodoService service, int index) =>
            {
                var finished = await service.ChangeStatus(index);
                if (finished == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(finished);
            });

            app.MapGet("/todo/{index}", async (TodoService service, int index) =>
            {
                var todo = await service.GetTask(index);
                if (todo == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(todo);
            });

            app.Run();
        }
    }
}
