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
using AutoMapper.QueryableExtensions;

namespace PIMToolCodeBase.Controllers
{
    public class ProjectController:BaseController
    {
        private readonly IMapper _mapper;
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService, IMapper mapper)
        {
            _projectService = projectService;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProjectDto> GetAll()
        {
            return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.Get());
        }

        [HttpGet]

        public IEnumerable<ProjectDto> GetHaveCondition(string input, Status status, int page)
        {
            return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.GetHaveCondition(input, status, page));
        }

        [HttpPost]
        public void Create(ProjectCreateDto projectCreateDto)
        {
            Project project = _mapper.Map<ProjectCreateDto, Project>(projectCreateDto);

           // project.ProjectEmployees = new List<ProjectEmployee> { new ProjectEmployee { EmployeeId = projectCreateDto.EmployeeIds.FirstOrDefault().EmployeeId } };
            _projectService.Create(project);
        }
        [HttpDelete]
        public void DeleteProject(params int[] id)
        {
            _projectService.DeleteProject(id);
        }
    }
}
