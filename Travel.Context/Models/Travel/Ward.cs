﻿using System;

namespace Travel.Context.Models
{
    public class Ward
    {
        private Guid id;
        private string name;
        private Guid idDistrict;
        public District District { get; set; }

        public Guid Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public Guid IdDistrict { get => idDistrict; set => idDistrict = value; }
    }
}