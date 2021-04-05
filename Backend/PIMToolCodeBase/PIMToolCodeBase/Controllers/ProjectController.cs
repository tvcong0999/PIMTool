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
        public IEnumerable<ProjectDto> Get()
        {
             return _mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDto>>(_projectService.Get());
        }

        [HttpPost]
        public ProjectDto Post(ProjectDto projectDto)
        {
            return _mapper.Map<Project, ProjectDto>(_projectService.Create(_mapper.Map<ProjectDto, Project>(projectDto)));
        }
    }
}
