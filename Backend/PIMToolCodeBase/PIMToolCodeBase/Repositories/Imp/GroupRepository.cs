using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class GroupRepository:BaseRepository<Group>, IGroupRepository
    {
        public GroupRepository(PimContext context) : base(context)
        {
        }
    }
}
