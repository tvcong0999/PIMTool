using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Data.Entity;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;

namespace PIMToolCodeBase.Database
{
    /// <summary>
    ///     DbContext of PIMTool.
    /// </summary>
    public class PimContext : DbContext
    {
        public PimContext() : base("PimDatabase")
        {
        }

        public PimContext(DbConnection dbConnection) : base(dbConnection, true)
        {
        }
        public DbSet<Project> Projects
        {
            get;
            set;
        }
        public DbSet<Employee> Employees
        {
            get;
            set;
        }
        public DbSet<Group> Groups
        {
            get;
            set;
        }
        public DbSet<Sample> Samples { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BaseEntity>().HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Sample>().ToTablePerConcreteTable();
            modelBuilder.Entity<Employee>().ToTablePerConcreteTable();
            modelBuilder.Entity<Group>().ToTablePerConcreteTable();
            modelBuilder.Entity<Project>().ToTablePerConcreteTable();

            modelBuilder
                .Entity<Group>()
                .HasRequired(e => e.GroupLeader)
                .WithOptional(g => g.Group);

            modelBuilder.Entity<Group>()
                .HasMany(p => p.Projects)
                .WithRequired(g => g.Group)
                .HasForeignKey(g => g.GroupID)
                .WillCascadeOnDelete(true);

            modelBuilder.Entity<Project>()
                .HasMany(e => e.Employees)
                .WithMany(p => p.Projects)
                .Map(m =>
                {
                    m.ToTable("ProjectEmployee");
                    m.MapLeftKey("ProjectID");
                    m.MapRightKey("EmployeeID");
                });
        }
    }
}