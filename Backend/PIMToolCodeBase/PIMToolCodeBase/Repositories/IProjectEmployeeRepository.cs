using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories
{
    public interface IProjectEmployeeRepository
    { 
        IEnumerable<ProjectEmployee> Add(ICollection<ProjectEmployee> entities);
        void Delete(params int[] ids);
        void Delete(ICollection<ProjectEmployee> entities);
        void SaveChange();
        IEnumerable<ProjectEmployee> GetById(int id);
    }
}
