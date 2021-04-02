using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Group : BaseEntity
    {
        //[Key]
        //public new int ID
        //{
        //    get;
        //    set;
        //}
        [Index(IsUnique = true)]
        [Required]
        public int GroupLeaderID
        {
            get;
            set;
        }
        [Required]
        public int Version
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
