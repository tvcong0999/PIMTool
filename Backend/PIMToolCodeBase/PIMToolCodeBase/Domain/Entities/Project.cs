﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Project : BaseEntity
    {
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
        public byte[] TimeStamp
        {
            get;
            set;
        }
        public virtual Group Group
        {
            get;
            set;
        }
        public ICollection<ProjectEmployee> ProjectEmployees
        {
            get;
            set;
        }
    }
}
