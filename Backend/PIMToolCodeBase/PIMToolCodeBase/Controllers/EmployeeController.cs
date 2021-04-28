using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using PIMToolCodeBase.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace PIMToolCodeBase.Controllers
{
    public class EmployeeController:BaseController
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        public IEnumerable<EmployeeDto> GetByVISAOrName(string input)
        {
            return _mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeDto>>(_employeeService.Get(input));
        }

        [HttpPost]
        public IEnumerable<EmployeeDto> GetByIds(params int[] ids)
        {
            return _mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeDto>>(_employeeService.GetByIds(ids));
        }

    }
}
