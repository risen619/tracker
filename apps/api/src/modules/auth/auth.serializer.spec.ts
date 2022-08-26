import { Test, TestingModule } from '@nestjs/testing';
import { AuthSerializer } from './auth.serializer';

describe('AuthSerializer', () =>
{
    let service: AuthSerializer;

    beforeEach(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthSerializer],
        }).compile();

        service = module.get<AuthSerializer>(AuthSerializer);
    });

    it('should be defined', () =>
    {
        expect(service).toBeDefined();
    });
});
