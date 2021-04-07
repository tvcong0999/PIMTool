using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Database
{
    public class ProjectEntityConfiguration : BaseEntityConfiguration<Project>
    {
        public ProjectEntityConfiguration()
        {
            this.ToTablePerConcreteTable();

            this.Property(p => p.GroupId).IsRequired();
            this.HasIndex(p => p.ProjectNumber).IsUnique();
            this.Property(p => p.ProjectNumber).IsRequired();
            this.Property(p => p.Name).IsRequired().HasMaxLength(50);
            this.Property(p => p.Customer).IsRequired().HasMaxLength(50);
            this.Property(p => p.Status).IsRequired();
            this.Property(p => p.StartDate).IsRequired();
            this.Property(p => p.Version).IsRequired();

            this.HasMany(p => p.ProjectEmployees).WithRequired(pe => pe.Project).HasForeignKey(pe => pe.ProjectId);
        }
    }
}
