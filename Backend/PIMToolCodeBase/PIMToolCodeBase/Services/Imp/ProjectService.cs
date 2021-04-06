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
            var projects = _projectRepository.Add(project);
            //foreach (var pro in projects)
            //{
            //    //_projectRepository.Attach(pro);
            //    foreach (var em in pro.Employees)
            //    {
            //        Employee employee = _employeeRepository.Get(em.Id);
            //        if (employee != null)
            //        {
            //            _employeeRepository.UnChange(em);
                        
            //        }

            //    }

            //}

                _projectRepository.Attach(project);
   

           
            _projectRepository.SaveChange();
            return project;
        }

        public IEnumerable<Project> Get()
        {
            return _projectRepository.GetInclude();
        }

        public IEnumerable<Project> GetHaveCondition(string input, Enum status, int page)
        {
            return _projectRepository.GetHaveCondition(input, status, page);
        }
    }
}
