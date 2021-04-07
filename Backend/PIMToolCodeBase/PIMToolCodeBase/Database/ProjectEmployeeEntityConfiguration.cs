using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Database
{
    public class ProjectEmployeeEntityConfiguration : EntityTypeConfiguration<ProjectEmployee>
    {
        public ProjectEmployeeEntityConfiguration()
        {
            this.HasKey(p => new { p.EmployeeId, p.ProjectId});
            this.ToTablePerConcreteTable();
        }
    }
}
