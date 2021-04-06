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
                .ForMember(source => source.Id, opts => opts.MapFrom(p => p.Id)).ReverseMap()
                .ForMember(source => source.GroupID, opts => opts.MapFrom(p => p.GroupID)).ReverseMap()
                .ForMember(source => source.ProjectNumber, opts => opts.MapFrom(p => p.ProjectNumber)).ReverseMap()
                .ForMember(source => source.Customer, opts => opts.MapFrom(p => p.Customer)).ReverseMap()
                .ForMember(source => source.Name, opts => opts.MapFrom(p => p.Name)).ReverseMap()
                .ForMember(source => source.StartDate, opts => opts.MapFrom(p => p.StartDate)).ReverseMap()
                .ForMember(source => source.FinishDate, opts => opts.MapFrom(p => p.FinishDate)).ReverseMap()
                .ForMember(source => source.Version, opts => opts.MapFrom(p => p.Version)).ReverseMap()
                .ForMember(source => source.Status, opts => opts.MapFrom(p => p.Status)).ReverseMap();


            CreateMap<Employee, EmployeeDto>()
                .ForMember(source => source.Id, opts => opts.MapFrom(p => p.Id)).ReverseMap()
                .ForMember(source => source.Visa, opts => opts.MapFrom(p => p.Visa)).ReverseMap()
                .ForMember(source => source.FirstName, opts => opts.MapFrom(p => p.FirstName)).ReverseMap()
                .ForMember(source => source.LastName, opts => opts.MapFrom(p => p.LastName)).ReverseMap()
                .ForMember(source => source.BirthDay, opts => opts.MapFrom(p => p.BirthDay)).ReverseMap()
                .ForMember(source => source.Version, opts => opts.MapFrom(p => p.Version)).ReverseMap();
        }
    }
}