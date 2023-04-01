using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Xml.Linq;

namespace backend.Models
{
    public class User
    {
        public int? Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public static IEnumerable<User> GetUsers()
        {
            using (var context = new Database())
            {
                return context.Users.ToList();
            }
        }

        public static User? GetUser(User user)
        {
            using (var context = new Database())
            {
                return context.Users.FirstOrDefault(u => u.Username == user.Username);
            }
        }

        public static void AddUser(User user)
        {
            using (var context = new Database())
            {
                context.Users.Add(user);
                context.SaveChanges();
            }
        }
    }
}
