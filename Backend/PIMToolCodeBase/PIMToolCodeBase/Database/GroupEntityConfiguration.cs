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

            this.Property(g => g.Version).IsRequired();

            this.HasKey(g => g.GroupLeaderId);

            this.HasRequired(e => e.GroupLeader)
              .WithOptional(g => g.Group);

            this.HasMany(p => p.Projects)
              .WithRequired(g => g.Group)
              .HasForeignKey(g => g.GroupID)
              .WillCascadeOnDelete(true);
        }
    }
}
