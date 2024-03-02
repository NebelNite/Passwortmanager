using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace SharedLibrary
{
    public class EntryModel
    {

        public string id { get; set; }
        public string title { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string url { get; set; }
        public string notes { get; set; }


        public override string ToString()
        {

            string password = new string('*', this.password.Length);

            return $"Title: {title}, Username: {username}, Password: {password}, URL: {url}, Notes: {notes}";
        }

    }
}
