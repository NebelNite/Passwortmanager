using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLibrary
{
    public class UserModel
    {
        public string id { get; set; }
        public string username { get; set; }
        public List<PasswortModel> passwords { get; set; }
        public string masterKey { get; set; }
    }
}
