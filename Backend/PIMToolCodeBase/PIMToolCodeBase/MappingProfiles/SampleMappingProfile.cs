using AutoMapper;
using PIMToolCodeBase.Domain.Entities;
using PIMToolCodeBase.Dtos;
using System.Collections;
using System.Collections.Generic;

namespace PIMToolCodeBase.MappingProfiles
{
    public class SampleMappingProfile : Profile
    {
        public SampleMappingProfile() : base(nameof(SampleMappingProfile))
        {
            CreateMap<Sample, SampleDto>().ReverseMap();
            CreateMap<Project, ProjectDto>()
                .ReverseMap();


            CreateMap<Employee, EmployeeDto>()
                .ReverseMap();
            CreateMap<Group, GroupDto>().ReverseMap();
        }
    }
}