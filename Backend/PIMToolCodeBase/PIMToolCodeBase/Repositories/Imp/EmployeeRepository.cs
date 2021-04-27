using PIMToolCodeBase.Database;
using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories.Imp
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(PimContext pimContext) : base(pimContext)
        {
      
        }

        public IEnumerable<Employee> GetByIds(params int[] ids)
        {
            return Set.Where(x => ids.Contains(x.Id)).ToList();
        }
    }
}
