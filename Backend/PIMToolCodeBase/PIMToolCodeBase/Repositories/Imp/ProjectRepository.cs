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

        public void Attach(Project project)
        {
            Set.Attach(project);
        }

        public int CountProjects()
        {
            return Set.Count();
        }

        public IEnumerable<Project> GetByIds(params int[] ids)
        {
            return Set.Where(x => ids.Contains(x.Id)).ToList();
        }

        public Project GetDetail(int id)
        {
            return Set.Include(e=>e.ProjectEmployees).FirstOrDefault(x=>x.Id==id);
        }


        public Project GetInclude(int id)
        {
            return Set.Where(p=>p.Id==id).Include(e=>e.ProjectEmployees).FirstOrDefault();
        }

        public bool ValidateProjectNumber(int projectNumber)
        {
            return Set.Any(p => p.ProjectNumber == projectNumber);
        }
    }
}
