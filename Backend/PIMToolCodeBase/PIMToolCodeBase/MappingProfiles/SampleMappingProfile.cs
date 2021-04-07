using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace PIMToolCodeBase.MappingProfiles
{
    public class SampleMappingProfile : Profile
    {
        public SampleMappingProfile() : base(nameof(SampleMappingProfile))
        {
            CreateMap<Sample, SampleDto>().ReverseMap();
            CreateMap<Project, ProjectDto>()
                .ReverseMap();

            CreateMap<Project, ProjectCreateDto>().ForMember(d=>d.EmployeeIds, s=>s.MapFrom(p=>p.ProjectEmployees
            .Select(pe=>pe.EmployeeId))).ReverseMap();

            CreateMap<Employee, EmployeeDto>()
                .ReverseMap();
            CreateMap<Group, GroupDto>().ReverseMap();

            CreateMap<ProjectEmployee, ProjectEmployeeDto>().ReverseMap();
        }
    }
}