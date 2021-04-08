﻿using System;
using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using PIMToolCodeBase.Database;
using PIMToolCodeBase.Repositories;
using PIMToolCodeBase.Repositories.Imp;
using PIMToolCodeBase.Services;
using PIMToolCodeBase.Services.Imp;

namespace PIMToolCodeBase.Configurations
{
    public static class AutofacConfigurations
    {
        public static IContainer Register(Action<ContainerBuilder> extendRegister = null)
        {
            var builder = new ContainerBuilder();

            // for all controller in app
            builder.RegisterApiControllers(typeof(Program).Assembly);

            // Services register
            builder.RegisterType<SampleService>().As<ISampleService>().InstancePerLifetimeScope();
            builder.RegisterType<ProjectService>().As<IProjectService>().InstancePerLifetimeScope();
            builder.RegisterType<EmployeeService>().As<IEmployeeService>().InstancePerLifetimeScope();
            builder.RegisterType<GroupService>().As<IGroupService>().InstancePerLifetimeScope();

            // Repositories register
            builder.RegisterType<SampleRepository>().As<ISampleRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ProjectRepository>().As<IProjectRepository>().InstancePerLifetimeScope();
            builder.RegisterType<EmployeeRepository>().As<IEmployeeRepository>().InstancePerLifetimeScope();
            builder.RegisterType<GroupRepository>().As<IGroupRepository>().InstancePerLifetimeScope();
            builder.RegisterType<ProjectEmployeeRepository>().As<IProjectEmployeeRepository>().InstancePerLifetimeScope();

            // Context
            builder.RegisterType<PimContext>().AsSelf().InstancePerLifetimeScope();

            // mapper
            builder.RegisterInstance(MapperFactory.GetMapper()).As<IMapper>().SingleInstance();

            // extend register
            extendRegister?.Invoke(builder);

            return builder.Build();
        }
    }
}