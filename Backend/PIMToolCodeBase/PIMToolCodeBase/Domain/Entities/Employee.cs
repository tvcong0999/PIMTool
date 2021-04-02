using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIMToolCodeBase.Domain.Entities
{
    public class Employee : BaseEntity
    {
        //[Key]
        //public new int ID
        //{
        //    get;
        //    set;
        //}

        [Required, StringLength(3)]
        public string Visa
        {
            get;
            set;
        }
        [Required, StringLength(50), Display(Name = "First Name")]
        public string FirstName
        {
            get;
            set;
        }
        [Required, StringLength(50), Display(Name = "Last Name")]
        public string LastName
        {
            get;
            set;
        }
        [Required, Display(Name = "Birth Day")]
        public DateTime BirthDay
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
        public virtual Group Group
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
