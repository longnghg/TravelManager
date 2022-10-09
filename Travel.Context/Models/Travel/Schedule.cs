﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Context.Models
{
    public class Schedule
    {
        public string IdSchedule { get; set; }
        public long DepartureDate { get; set; }
        public long BeginDate { get; set; }
        public long EndDate { get; set; }
        public long TimePromotion { get; set; }
        public int Status { get; set; }
        public float FinalPrice { get; set; }
        public float QuantityAdult { get; set; }
        public float QuantityBaby { get; set; }
        public float MinCapacity { get; set; }
        public float QuantityChild { get; set; }
        public string IdTour { get; set; }
        public Guid IdCar { get; set; }
        public int IdPromotion { get; set; }
        public Guid IdEmployee { get; set; }
        public Car Cars { get; set; }
        public ICollection<Promotion> Promotions { get; set; }
        public Tour Tour { get; set; }
        public ICollection<Timeline> Timelines { get; set; }
        public Employee Employee { get; set; }
        
    }
}
