using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Database
{
    public class EmployeeEntityConfiguration : BaseEntityConfiguration<Employee>
    {
        public EmployeeEntityConfiguration()
        {
            this.ToTablePerConcreteTable();

            this.Property(e => e.Visa).IsRequired().HasMaxLength(3);
            this.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
            this.Property(e => e.LastName).IsRequired().HasMaxLength(50);
            this.Property(e => e.BirthDay).IsRequired();
            this.Property(e => e.Version).IsRequired();

        }
    }
}
