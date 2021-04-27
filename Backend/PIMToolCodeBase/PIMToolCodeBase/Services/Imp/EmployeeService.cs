using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class EmployeeService : BaseService, IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public IEnumerable<Employee> Get(string input)
        {
            return _employeeRepository.Get().Where(p => p.Visa.ToLower().Contains(input.ToLower()) || p.FirstName.ToLower().Contains(input.ToLower())
                                                    || p.LastName.ToLower().Contains(input.ToLower())).ToList();
        }

        public Employee Get(int id)
        {
            return _employeeRepository.Get(id);
        }

        public IEnumerable<Employee> GetByIds(params int[] ids)
        {
            return _employeeRepository.GetByIds(ids);
        }
    }
}
