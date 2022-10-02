﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Travel.Shared.Models
{
    public enum StatusCar
    {
        Broken = -1, // xe đang hư
        Free = 0, // xe đang rảnh
        Busy = 1, // xe đã có tour
    }
    public enum TitleRole
    {
       Admin = -1,
       LocalManager = 0,
       ServiceManager = 1,
       TourManager = 2,
       TourBookingManager = 3,
    }
}
