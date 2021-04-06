using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Database
{
    public class BaseEntityConfiguration<T> : EntityTypeConfiguration<T> where T: BaseEntity
    {
        public BaseEntityConfiguration()
        {
            this.HasKey<int>(x => x.Id)
                .Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
