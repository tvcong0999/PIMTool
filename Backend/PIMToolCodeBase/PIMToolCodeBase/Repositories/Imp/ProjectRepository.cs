using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        public ProjectRepository(PimContext context) : base(context)
        {
        }

        public IEnumerable<Project> GetInclude()
        {
            return Set.Include(e=>e.Employees).ToList();
        }
    }
}
