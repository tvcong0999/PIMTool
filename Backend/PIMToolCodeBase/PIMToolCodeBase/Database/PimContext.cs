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
            //modelBuilder.Entity<BaseEntity>().HasKey(x => x.Id)
            //    .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Sample>()
                .HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Sample>().ToTablePerConcreteTable();

            modelBuilder.Entity<Employee>().ToTablePerConcreteTable();
            modelBuilder.Entity<Employee>()
                .HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Employee>().Property(e => e.Visa).IsRequired().HasMaxLength(3);
            modelBuilder.Entity<Employee>().Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(e => e.LastName).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Employee>().Property(e => e.BirthDay).IsRequired();
            modelBuilder.Entity<Employee>().Property(e => e.Version).IsRequired();
            //modelBuilder.Entity<Employee>().HasOptional(g => g.Group).WithRequired(e => e.GroupLeader);


            modelBuilder.Entity<Group>()
                .HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Group>().ToTablePerConcreteTable();
            modelBuilder.Entity<Group>().Property(g=>g.Version).IsRequired();
            modelBuilder.Entity<Group>().HasKey(g => g.GroupLeaderId);
            modelBuilder
          .Entity<Group>()
          .HasRequired(e => e.GroupLeader)
          .WithOptional(g => g.Group);
            
            modelBuilder
              .Entity<Group>()
              .HasMany(p => p.Projects)
              .WithRequired(g => g.Group)
              .HasForeignKey(g => g.GroupID)
              .WillCascadeOnDelete(true);

            modelBuilder.Entity<Project>()
                .HasKey(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Project>().ToTablePerConcreteTable();
            modelBuilder.Entity<Project>().Property(p=>p.GroupID).IsRequired();
            modelBuilder.Entity<Project>().HasIndex(p => p.ProjectNumber).IsUnique();
            modelBuilder.Entity<Project>().Property(p => p.ProjectNumber).IsRequired();
            modelBuilder.Entity<Project>().Property(p => p.Name).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Project>().Property(p => p.Customer).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<Project>().Property(p => p.Status).IsRequired().HasMaxLength(3);
            modelBuilder.Entity<Project>().Property(p => p.StartDate).IsRequired();
            modelBuilder.Entity<Project>().Property(p => p.Version).IsRequired();
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