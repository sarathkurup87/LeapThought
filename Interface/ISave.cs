using LeapThought.Models;

namespace LeapThought.Interface
{
    public interface ISave
    {
        Task WriteJson(Label _label);
    }
}
