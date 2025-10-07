﻿using Microsoft.EntityFrameworkCore;
using TestoweAPI.Models;

namespace TestoweAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoItem> Todos { get; set; }
    }
}
