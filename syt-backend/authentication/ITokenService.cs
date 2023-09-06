namespace syt_backend.authentication
{
    public interface ITokenService
    {
        internal string GenerateToken(User user);
        internal bool VerifyToken(string token);
    }
}
