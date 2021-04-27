using PIMToolCodeBase.Domain.Entities;
using System;
using System.Collections;
using System.Collections.Generic;

namespace PIMToolCodeBase.Dtos
{
    public class ProjectDto
    {
        public int Id
        {
            get;
            set;
        }
        public int GroupId
        {
            get;
            set;
        }
        public int ProjectNumber
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Customer
        {
            get;
            set;
        }
        public Status Status
        {
            get;
            set;
        }
        public DateTime StartDate
        {
            get;
            set;
        }

        public DateTime? FinishDate
        {
            get;
            set;
        }
        public List<int> EmployeeIds
        {
            get;
            set;
        }
    }
}

