namespace UserApi.Models
{
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string education { get; set; }
    }
}