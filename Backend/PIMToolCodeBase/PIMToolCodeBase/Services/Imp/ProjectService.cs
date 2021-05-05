using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.HandleExceptions;
using PIMToolCodeBase.Repositories;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Services.Imp
{
    public class ProjectService: BaseService, IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IProjectEmployeeRepository _projectEmployeeRepository;
        public ProjectService(IProjectRepository projectRepository, IProjectEmployeeRepository projectEmployeeRepository)
        {
            _projectRepository = projectRepository;
            _projectEmployeeRepository = projectEmployeeRepository;
        }

        public int CountProjects(string input, Status? status)
        {
            return _projectRepository.Get().Where(p => (String.IsNullOrEmpty(input)
            || p.ProjectNumber.ToString() == input || p.Name.ToLower().Contains(input.ToLower()) || p.Customer.ToLower().Contains(input.ToLower()))
            && (!status.HasValue || p.Status == status)).Count();
        }

        public void Create(Project project)
        {
            try
            {
                var projects = _projectRepository.Add(project);
                _projectRepository.SaveChange();
            }
            catch(Exception e)
            {
                 throw new ProjectNumberAlreadyExistsException("Project number is already exists in database.", e);
            }
            
        }

        public void DeleteProject(params int[] ids)
        {
            var project = _projectRepository.GetByIds(ids);
            _projectEmployeeRepository.Delete(ids);
            _projectRepository.Delete(ids);
            _projectRepository.SaveChange();
             if(project.Count() == 0)
                throw new Exception("Project is not exists in database.");

           
        }

        public IEnumerable<Project> Get()
        {
            IEnumerable<Project> listProject = _projectRepository.Get();
            foreach(var project in listProject)
            {
                project.ProjectEmployees = _projectEmployeeRepository.GetById(project.Id).ToList();
            }
            return listProject;
        }

        public Project GetDetail(int id)
        {
            return _projectRepository.GetDetail(id);
        }

        public IEnumerable<Project> GetHaveCondition(string input, Status? status, int page)
        {
            return _projectRepository.Get().Where(p => (String.IsNullOrEmpty(input)
            || p.ProjectNumber.ToString() == input || p.Name.ToLower().Contains(input.ToLower()) || p.Customer.ToLower().Contains(input.ToLower()))
            && (!status.HasValue || p.Status == status))
                .OrderBy(p => p.ProjectNumber).Skip((page - 1) * 5).Take(5).ToList();
        }

        public void UpdateProject(Project project)
        {

                var projectUpdate = _projectRepository.GetInclude(project.Id);

                if (projectUpdate == null)
                    throw new ArgumentException();

                projectUpdate.GroupId = project.GroupId;
                projectUpdate.ProjectNumber = project.ProjectNumber;
                projectUpdate.Name = project.Name;
                projectUpdate.Customer = project.Customer;
                projectUpdate.Status = project.Status;
                projectUpdate.StartDate = project.StartDate;
                projectUpdate.FinishDate = project.FinishDate;

                _projectEmployeeRepository.Delete(projectUpdate.ProjectEmployees);

                

                foreach (var pro in project.ProjectEmployees)
                {
                    projectUpdate.ProjectEmployees.Add(pro);
                }

            //_projectEmployeeRepository.Add(project.ProjectEmployees);
            _projectEmployeeRepository.SaveChange();
            _projectRepository.SaveChange();
    
        }

        public bool ValidateProjectNumber(int projectNumber)
        {
           return _projectRepository.ValidateProjectNumber(projectNumber);
        }
    }
}
