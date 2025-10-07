using Microsoft.EntityFrameworkCore;
using TestoweAPI.Data;
using TestoweAPI.Models;

namespace TestoweAPI.Services
{
    public class TodoService
    {
        private readonly AppDbContext _context;

        public TodoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoItem>> GetTasks() => 
            await _context.Todos.ToListAsync();

        public async Task<TodoItem> AddTask(string title)
        {
            var todo = new TodoItem { Title = title, IsDone = false };
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        public async Task<TodoItem?> UpdateTask(int index, string newTitle)
        {
            var todo = await _context.Todos.FindAsync(index);
            if (todo != null)
            {
                todo.Title = newTitle;
                await _context.SaveChangesAsync();
                return todo;
            }
            return null;
        }

        public async Task<TodoItem?> DeleteTask(int index)
        {
            var todo = await _context.Todos.FindAsync(index);
            if (todo != null)
            {
                var removed = todo;
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
                return removed;
            }
            return null;
        }

        public async Task<TodoItem?> ChangeStatus(int index)
        {
            var todo = await _context.Todos.FindAsync(index);
            if (todo != null)
            {
                todo.IsDone = !todo.IsDone;
                await _context.SaveChangesAsync();
                return todo;
            }
            return null;
        }

        public async Task<TodoItem?> GetTask(int index)
        {
            var todo = await _context.Todos.FindAsync(index);
            if(todo == null)
            {
                return null;
            }
            return todo;
        }

    }
}
