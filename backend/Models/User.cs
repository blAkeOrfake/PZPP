using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Xml.Linq;

namespace backend.Models;

public class User
{
    public int? Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Country { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? PostalCode { get; set; }
    public string? ContactAddress { get; set; }
    public string? ContactCity { get; set; }
    public string? ContactPostalCode { get; set; }
    public string? TaxAddress { get; set; }
    public string? TaxCity { get; set; }
    public string? TaxPostalCode { get; set; }

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

    public static ActionResult<User> UpdateUserById(int id, User newValue)
    {
        using (var context = new Database())
        {
            var user = GetUserById(id);
            user = newValue;
            context.Users.Update(user);
            context.SaveChanges();
            return user;
        }
    }

    public static User? GetUserById(int id)
    {
        using (var context = new Database())
        {
            return context.Users.FirstOrDefault(u => u.Id == id);
        }
    }

    public static ActionResult<User> AddUser(User user)
    {
        using (var context = new Database())
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user;
        }
    }

    public static ActionResult<User> DeleteUserById(int id)
    {
        using (var context = new Database())
        {
            var user = GetUserById(id);

            context.Users.Remove(user);
            context.SaveChanges();
            return user;
        }
    }
}
