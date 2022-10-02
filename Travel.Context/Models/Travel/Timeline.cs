﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DuAN.Models
{
    public class Timeline
    {
        private string  id;
        private string description;
        private long fromTime;
        private long toTime;
        private string modifyBy;
        private long modifyDate;

        private bool isDelete;

        public string Id { get => id; set => id = value; }
        public string Description { get => description; set => description = value; }
        public long FromTime { get => fromTime; set => fromTime = value; }
        public long ToTime { get => toTime; set => toTime = value; }
        public string ModifyBy { get => modifyBy; set => modifyBy = value; }
        public long ModifyDate { get => modifyDate; set => modifyDate = value; }
        public bool IsDelete { get => isDelete; set => isDelete = value; }
    }
}
