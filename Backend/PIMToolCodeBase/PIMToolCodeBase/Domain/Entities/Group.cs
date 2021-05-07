using System;
using System.Collections.Generic;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Group : BaseEntity
    {
        public int GroupLeaderId
        {
            get;
            set;
        }
        public string GroupName
        {
            get;
            set;
        }
        public byte[] TimeStamp
        {
            get;
            set;
        }

        public virtual Employee GroupLeader
        {
            get;
            set;
        }
        public ICollection<Project> Projects
        {
            get;
            set;
        }
    }
}
