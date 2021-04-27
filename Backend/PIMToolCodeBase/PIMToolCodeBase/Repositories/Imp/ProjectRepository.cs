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

        public IEnumerable<Project> GetByIds(params int[] ids)
        {
            return Set.Where(x => ids.Contains(x.Id)).ToList();
        }

        //public IEnumerable<Project> GetHaveCondition(string input, string status, int page)
        //{

        //    return Set.Where(p => (String.IsNullOrEmpty(input)
        //    || p.ProjectNumber.ToString() == input || p.Name.Contains(input) || p.Customer.Contains(input))
        //    && (String.IsNullOrEmpty(status) || p.Status == status))
        //        .OrderBy(p => p.ProjectNumber).Skip((page - 1) * 5).Take(5).ToList();


        //}

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
