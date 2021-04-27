using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class ProjectEmployeeRepository:IProjectEmployeeRepository
    {
        private readonly PimContext _pimContext;
        private readonly DbSet<ProjectEmployee> Set;
        public ProjectEmployeeRepository(PimContext pimContext)
        {
            _pimContext = pimContext;
            Set = _pimContext.Set<ProjectEmployee>();
        }
        public IEnumerable<ProjectEmployee> Add(ICollection<ProjectEmployee> entities)
        {
            return Set.AddRange(entities);
        }
        public void Delete(params int[] ids)
        {
            Set.RemoveRange(Set.Where(x=>ids.Contains(x.ProjectId)));

        }
        public void Delete(ICollection<ProjectEmployee> entities)
        {
            Set.RemoveRange(entities);

        }

        public IEnumerable<ProjectEmployee> GetById(int id)
        {
            return Set.Where(x => x.ProjectId == id);
        }

        public void SaveChange()
        {
            _pimContext.SaveChanges();
        }
    }
}
