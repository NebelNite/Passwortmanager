using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswortmanagerWPF
{
    public class UserModel
    {

        public string id { get; set; }
        public string username { get; set; }
        public List<EntryModel> entries { get; set; }
        public string masterKey { get; set; }


    }
}
