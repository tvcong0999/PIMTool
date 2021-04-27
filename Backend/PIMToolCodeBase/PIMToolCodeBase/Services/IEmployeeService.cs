using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> Get(string input);
        Employee Get(int id);
        IEnumerable<Employee> GetByIds(params int[] ids);
    }
}
