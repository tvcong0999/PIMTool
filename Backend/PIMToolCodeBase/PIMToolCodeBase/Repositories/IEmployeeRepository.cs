using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Repositories
{
    public interface IEmployeeRepository:IRepository<Employee>
    {
        IEnumerable<Employee> GetByIds(params int[] ids);
    }

}
