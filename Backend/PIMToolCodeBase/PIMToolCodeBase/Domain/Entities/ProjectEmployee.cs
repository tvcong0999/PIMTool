﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PIMToolCodeBase.Domain.Entities
{
    public class ProjectEmployee:BaseEntity
    {
        public int ProjectId
        {
            get;
            set;
        }
        public int EmployeeId 
        {
            get;
            set;
        }
        public virtual Project Project
        {
            get;
            set;
        }
        public virtual Employee Employee
        {
            get;
            set;
        }
    }
}
