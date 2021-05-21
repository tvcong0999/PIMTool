using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using System.Data.Entity;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;

namespace PIMToolCodeBase.Database
{
    /// <summary>sdsds
    ///     DbContext of PIMTool.
    /// </summary>
    /// fgbnfgy
    public class PimContext : DbContext
    {
        gfhfg
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

            modelBuilder.Configurations.Add(new GroupEntityConfiguration());
            modelBuilder.Configurations.Add(new EmployeeEntityConfiguration());
            modelBuilder.Configurations.Add(new ProjectEntityConfiguration());
            modelBuilder.Configurations.Add(new ProjectEmployeeEntityConfiguration());

        }
    }
}