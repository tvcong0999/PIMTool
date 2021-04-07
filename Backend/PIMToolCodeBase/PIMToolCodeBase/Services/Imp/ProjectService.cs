using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class ProjectService: BaseService, IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public ProjectService(IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
        {
            _projectRepository = projectRepository;
            _employeeRepository = employeeRepository;
        }

        public Project Create(Project project)
        {


            //Employee employee = _employeeRepository.Get(1);
            //project.Employees = (ICollection<Employee>)employee;
            project.Employees = null;
            _projectRepository.Add(project);
            _projectRepository.SaveChange();
            return project;
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.GetInclude();
        }

        public IEnumerable<Project> GetHaveCondition(string input, int status, int page)
        {
            string stt = "";
            if (status >= 0)
            {
                stt = ((EnumStatus)status).ToString();
            }    
            return _projectRepository.GetHaveCondition(input, stt, page);
        }
    }
}
