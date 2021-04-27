using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Database
{
    public class GroupEntityConfiguration : BaseEntityConfiguration<Group>
    {
        public GroupEntityConfiguration()
        {
            this.ToTablePerConcreteTable();

            this.Property(g => g.TimeSpamp).IsRowVersion();
            this.Property(g => g.GroupName).IsRequired();

            this.HasRequired(e => e.GroupLeader);
            


            this.HasMany(p => p.Projects)
              .WithRequired(g => g.Group)
              .HasForeignKey(g => g.GroupId)
              .WillCascadeOnDelete(false);
        }
    }
}
