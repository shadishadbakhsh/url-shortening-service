using Microsoft.EntityFrameworkCore;


namespace URLShorteningApi.Models;

    public class URLShorteningContext : DbContext
    {
        public URLShorteningContext(DbContextOptions<URLShorteningContext> options)
    : base(options)
        {
        }

        public DbSet<URLShorteningItem> URLShorteningItems { get; set; } = null!;
    }

